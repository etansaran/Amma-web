/**
 * Pournami Girivalam calendar 2026–2027 with tithi times, exactly as approved in the
 * Tiruvannamalai guide design. Times are IST. The Events page merges this list with
 * the ashram's own pooja calendar (content/events.ts).
 */
export type GirivalamDate = {
  /** ISO date of the Girivalam day (the day the full-moon walk is done). */
  date: string;
  /** For a tithi that spans two walking days, the second day. */
  endDate?: string;
  /** Display string as printed in the table, e.g. "Tue 24 Nov 2026". */
  dateLabel: string;
  /** Tamil month, with the festival name where the design lists one. */
  tamilMonth: string;
  /** "11:42 PM, 23 Nov" — as printed. */
  tithiBegins: string;
  /** "8:23 PM, 24 Nov" — as printed. */
  tithiEnds: string;
  /** ISO datetime (IST) for the tithi start — for calendars and schema. */
  tithiStart: string;
  /** ISO datetime (IST) for the tithi end. */
  tithiEnd: string;
  /** What happens at the ashram that night. */
  atAshram: string;
  /** Rows the design highlights (Deepam, Chitra Pournami, Guru Pournami). */
  highlight?: boolean;
};

export const girivalamDates: GirivalamDate[] = [
  {
    date: "2026-11-24",
    dateLabel: "Tue 24 Nov 2026",
    tamilMonth: "Karthigai · Karthigai Deepam",
    tithiBegins: "11:42 PM, 23 Nov",
    tithiEnds: "8:23 PM, 24 Nov",
    tithiStart: "2026-11-23T23:42:00+05:30",
    tithiEnd: "2026-11-24T20:23:00+05:30",
    atAshram: "Deepam pooja · all-night annadhanam",
    highlight: true,
  },
  {
    date: "2026-12-23",
    dateLabel: "Wed 23 Dec 2026",
    tamilMonth: "Margazhi",
    tithiBegins: "10:47 AM, 23 Dec",
    tithiEnds: "6:57 AM, 24 Dec",
    tithiStart: "2026-12-23T10:47:00+05:30",
    tithiEnd: "2026-12-24T06:57:00+05:30",
    atAshram: "Pournami pooja · annadhanam",
  },
  {
    date: "2027-01-22",
    dateLabel: "Fri 22 Jan 2027",
    tamilMonth: "Thai",
    tithiBegins: "9:29 PM, 21 Jan",
    tithiEnds: "5:46 PM, 22 Jan",
    tithiStart: "2027-01-21T21:29:00+05:30",
    tithiEnd: "2027-01-22T17:46:00+05:30",
    atAshram: "Pournami pooja · annadhanam",
  },
  {
    date: "2027-02-20",
    dateLabel: "Sat 20 Feb 2027",
    tamilMonth: "Maasi",
    tithiBegins: "7:59 AM, 20 Feb",
    tithiEnds: "4:52 AM, 21 Feb",
    tithiStart: "2027-02-20T07:59:00+05:30",
    tithiEnd: "2027-02-21T04:52:00+05:30",
    atAshram: "Pournami pooja · annadhanam",
  },
  {
    date: "2027-03-22",
    dateLabel: "Mon 22 Mar 2027",
    tamilMonth: "Panguni",
    tithiBegins: "6:21 PM, 21 Mar",
    tithiEnds: "4:13 PM, 22 Mar",
    tithiStart: "2027-03-21T18:21:00+05:30",
    tithiEnd: "2027-03-22T16:13:00+05:30",
    atAshram: "Pournami pooja · annadhanam",
  },
  {
    date: "2027-04-20",
    dateLabel: "Tue 20 Apr 2027",
    tamilMonth: "Chithirai · Chitra Pournami",
    tithiBegins: "4:51 AM, 20 Apr",
    tithiEnds: "3:56 AM, 21 Apr",
    tithiStart: "2027-04-20T04:51:00+05:30",
    tithiEnd: "2027-04-21T03:56:00+05:30",
    atAshram: "Sivayogam initiations · annadhanam",
    highlight: true,
  },
  {
    date: "2027-05-20",
    dateLabel: "Thu 20 May 2027",
    tamilMonth: "Vaikasi",
    tithiBegins: "4:02 PM, 19 May",
    tithiEnds: "4:28 PM, 20 May",
    tithiStart: "2027-05-19T16:02:00+05:30",
    tithiEnd: "2027-05-20T16:28:00+05:30",
    atAshram: "Pournami pooja · annadhanam",
  },
  {
    date: "2027-06-18",
    dateLabel: "Fri 18 Jun 2027",
    tamilMonth: "Aani",
    tithiBegins: "4:34 AM, 18 Jun",
    tithiEnds: "6:13 AM, 19 Jun",
    tithiStart: "2027-06-18T04:34:00+05:30",
    tithiEnd: "2027-06-19T06:13:00+05:30",
    atAshram: "Pournami pooja · annadhanam",
  },
  {
    date: "2027-07-18",
    dateLabel: "Sun 18 Jul 2027",
    tamilMonth: "Aadi · Guru Pournami",
    tithiBegins: "6:48 PM, 17 Jul",
    tithiEnds: "9:14 PM, 18 Jul",
    tithiStart: "2027-07-17T18:48:00+05:30",
    tithiEnd: "2027-07-18T21:14:00+05:30",
    atAshram: "Guru pooja for Maataji · satsang",
    highlight: true,
  },
  {
    date: "2027-08-17",
    dateLabel: "Tue 17 Aug 2027",
    tamilMonth: "Aavani",
    tithiBegins: "10:28 AM, 16 Aug",
    tithiEnds: "12:58 PM, 17 Aug",
    tithiStart: "2027-08-16T10:28:00+05:30",
    tithiEnd: "2027-08-17T12:58:00+05:30",
    atAshram: "Pournami pooja · annadhanam",
  },
  {
    date: "2027-09-15",
    dateLabel: "Wed 15 Sep 2027",
    tamilMonth: "Purattasi",
    tithiBegins: "2:48 AM, 15 Sep",
    tithiEnds: "4:32 AM, 16 Sep",
    tithiStart: "2027-09-15T02:48:00+05:30",
    tithiEnd: "2027-09-16T04:32:00+05:30",
    atAshram: "Pournami pooja · annadhanam",
  },
  {
    date: "2027-10-14",
    endDate: "2027-10-15",
    dateLabel: "Thu–Fri 14–15 Oct 2027",
    tamilMonth: "Aippasi",
    tithiBegins: "6:49 PM, 14 Oct",
    tithiEnds: "7:16 PM, 15 Oct",
    tithiStart: "2027-10-14T18:49:00+05:30",
    tithiEnd: "2027-10-15T19:16:00+05:30",
    atAshram: "Pournami pooja · annadhanam",
  },
  {
    date: "2027-11-14",
    dateLabel: "Sun 14 Nov 2027",
    tamilMonth: "Karthigai",
    tithiBegins: "9:55 AM, 13 Nov",
    tithiEnds: "8:55 AM, 14 Nov",
    tithiStart: "2027-11-13T09:55:00+05:30",
    tithiEnd: "2027-11-14T08:55:00+05:30",
    atAshram: "Pournami pooja · annadhanam",
  },
  {
    date: "2027-12-13",
    dateLabel: "Mon 13 Dec 2027",
    tamilMonth: "Margazhi",
    tithiBegins: "11:54 PM, 12 Dec",
    tithiEnds: "9:38 PM, 13 Dec",
    tithiStart: "2027-12-12T23:54:00+05:30",
    tithiEnd: "2027-12-13T21:38:00+05:30",
    atAshram: "Pournami pooja · annadhanam",
  },
];
