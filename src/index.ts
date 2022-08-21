import { WebClient } from "@slack/web-api";
import { createClient } from "@7nohe/play-console-report-client";
import dayjs from "dayjs";

// Change here
const PACKAGE_NAME = '<PACKAGE-NAME>';
const BUCKET_NAME = '<BUCKET-NAME>';
const SLACK_CHANNEL = '<YOUR-SLACK-CHANNEL>';

const playConsoleReportClient = createClient({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  },
});

const token = process.env.SLACK_TOKEN;
const slackClient = new WebClient(token);

const targetData = dayjs().subtract(3, "days");
const reportMonth = targetData.format("YYYYMM");

const statisticsReports = await playConsoleReportClient.getStatisticsReports({
  reportMonth,
  bucketName: BUCKET_NAME,
  packageName: PACKAGE_NAME,
});

const latestReport = statisticsReports.at(-1);

if (latestReport) {

  const response = await slackClient.chat.postMessage({
    channel: SLACK_CHANNEL,
    text: "Latest Report",
    attachments: [
      {
        color: 'good',
        fields: Object.entries(latestReport).map(([title, value]) => ({
          title,
          value,
        }))
      }
    ],
  });

  if (response.ok) {
    console.log("Message sent successfully!");
  }
}
