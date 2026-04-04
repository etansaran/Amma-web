package org.ammaashram.admin

import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.webkit.CookieManager
import android.webkit.PermissionRequest
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.net.toUri
import androidx.webkit.WebSettingsCompat
import androidx.webkit.WebViewFeature
import com.google.android.material.snackbar.Snackbar
import org.ammaashram.admin.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private var filePathCallback: ValueCallback<Array<Uri>>? = null
    private val adminUrl = "${BuildConfig.ADMIN_BASE_URL}/admin/login"
    private val allowedHost = BuildConfig.ADMIN_BASE_URL.toUri().host

    private val fileChooserLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            val callback = filePathCallback ?: return@registerForActivityResult
            val data = result.data
            val uris = when {
                result.resultCode != Activity.RESULT_OK -> null
                data?.clipData != null -> {
                    Array(data.clipData!!.itemCount) { index -> data.clipData!!.getItemAt(index).uri }
                }
                data?.data != null -> arrayOf(data.data!!)
                else -> null
            }
            callback.onReceiveValue(uris)
            filePathCallback = null
        }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setSupportActionBar(binding.toolbar)
        supportActionBar?.title = null

        setupWebView(binding.webView)
        binding.retryButton.setOnClickListener { binding.webView.reload() }
        binding.refreshButton.setOnClickListener { binding.webView.reload() }
        binding.openBrowserButton.setOnClickListener {
            startActivity(Intent(Intent.ACTION_VIEW, adminUrl.toUri()))
        }

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (binding.webView.canGoBack()) {
                    binding.webView.goBack()
                } else {
                    finish()
                }
            }
        })

        if (savedInstanceState == null) {
            binding.webView.loadUrl(adminUrl)
        } else {
            binding.webView.restoreState(savedInstanceState)
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        binding.webView.saveState(outState)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.main_actions, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.action_refresh -> {
                binding.webView.reload()
                true
            }
            R.id.action_login -> {
                binding.webView.loadUrl(adminUrl)
                true
            }
            R.id.action_browser -> {
                startActivity(Intent(Intent.ACTION_VIEW, binding.webView.url?.toUri() ?: adminUrl.toUri()))
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView(webView: WebView) {
        CookieManager.getInstance().setAcceptCookie(true)
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true)

        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            cacheMode = WebSettings.LOAD_DEFAULT
            mixedContentMode = WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE
            mediaPlaybackRequiresUserGesture = false
            builtInZoomControls = false
            displayZoomControls = false
            userAgentString = "$userAgentString AmmaAdminAndroid/1.0"
        }

        if (WebViewFeature.isFeatureSupported(WebViewFeature.ALGORITHMIC_DARKENING)) {
            WebSettingsCompat.setAlgorithmicDarkeningAllowed(webView.settings, true)
        }

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val target = request?.url ?: return false
                return if (target.host == allowedHost || target.toString().startsWith(BuildConfig.ADMIN_BASE_URL)) {
                    false
                } else {
                    startActivity(Intent(Intent.ACTION_VIEW, target))
                    true
                }
            }

            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                binding.progressBar.visibility = View.VISIBLE
                binding.errorGroup.visibility = View.GONE
                binding.statusText.text = "Loading secure admin portal..."
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                binding.progressBar.visibility = View.GONE
                binding.statusText.text = when {
                    url?.contains("/admin/login") == true -> "Admin login ready"
                    url?.contains("/admin") == true -> "Connected to live admin dashboard"
                    else -> "Connected"
                }
                binding.pageTitle.text = view?.title ?: getString(R.string.app_name)
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: android.webkit.WebResourceError?
            ) {
                if (request?.isForMainFrame == true) {
                    binding.progressBar.visibility = View.GONE
                    binding.errorGroup.visibility = View.VISIBLE
                    binding.statusText.text = "Connection problem"
                }
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onPermissionRequest(request: PermissionRequest?) {
                request?.grant(request.resources)
            }

            override fun onShowFileChooser(
                webView: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                this@MainActivity.filePathCallback?.onReceiveValue(null)
                this@MainActivity.filePathCallback = filePathCallback

                return try {
                    val intent = fileChooserParams?.createIntent() ?: Intent(Intent.ACTION_GET_CONTENT).apply {
                        addCategory(Intent.CATEGORY_OPENABLE)
                        type = "*/*"
                    }
                    fileChooserLauncher.launch(intent)
                    true
                } catch (exception: Exception) {
                    this@MainActivity.filePathCallback = null
                    Snackbar.make(binding.root, "Unable to open file picker", Snackbar.LENGTH_SHORT).show()
                    false
                }
            }
        }
    }
}
