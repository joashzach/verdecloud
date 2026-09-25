const {
  GetMetricStatisticsCommand
} = require("@aws-sdk/client-cloudwatch");

const { cloudWatchClient } =
  require("../config/aws");

async function getMetric(metricName, statistic, instanceId) {
  const endTime = new Date();

  const startTime = new Date(
    endTime.getTime() - 60 * 60 * 1000
  );

  const result = await cloudWatchClient.send(
    new GetMetricStatisticsCommand({
      Namespace: "AWS/EC2",
      MetricName: metricName,
      Dimensions: [
        {
          Name: "InstanceId",
          Value: instanceId
        }
      ],
      StartTime: startTime,
      EndTime: endTime,
      Period: 300,
      Statistics:
        statistic === "Average"
          ? ["Average"]
          : undefined,
      ExtendedStatistics:
        statistic === "p95"
          ? ["p95"]
          : undefined
    })
  );

  const datapoints = result.Datapoints || [];

  const values = datapoints
    .map((point) =>
      statistic === "Average"
        ? point.Average
        : point.ExtendedStatistics?.p95
    )
    .filter(Number.isFinite);

  if (values.length === 0) {
    return null;
  }

  return (
    values.reduce((sum, value) => sum + value, 0) /
    values.length
  );
}

async function getCpuMetrics(instanceId) {
  const avg = await getMetric(
    "CPUUtilization",
    "Average",
    instanceId
  );

  const p95 = await getMetric(
    "CPUUtilization",
    "p95",
    instanceId
  );

  return {
    avgCpuPercent: avg,
    p95CpuPercent: p95
  };
}

module.exports = {
  getCpuMetrics
};