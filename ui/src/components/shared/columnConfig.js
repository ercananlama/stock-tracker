const culture = 'en-US';
export const formatter = new Intl.NumberFormat(culture, { maximumFractionDigits: 2 });
export const ratingFormatter = new Intl.NumberFormat(culture, { maximumFractionDigits: 3 });
export const marketCapFormatter = new Intl.NumberFormat(culture, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const headCells = [
    {
        id: 'symbol',
        dataKey: 'symbol',
        key: true,
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'lastPrice',
        dataKey: 'lastPrice',
        numeric: true,
        disablePadding: false,
        label: 'Price',
        formatter: formatter
    },
    {
        id: 'dailyChangePerc',
        dataKey: 'dailyChangePerc',
        percentage: true,
        numeric: true,
        disablePadding: false,
        label: 'Daily change (%)',
        formatter: formatter
    },
    {
        id: 'firstTarget',
        dataKey: 'firstTarget',
        numeric: true,
        disablePadding: false,
        label: 'First target',
        formatter: formatter
    },
    {
        id: 'upsidePotentialByTargets',
        dataKey: 'upsidePotentialByTargets',
        numeric: true,
        disablePadding: false,
        label: 'Upside potential by targets (%)',
        percentage: true,
        formatter: formatter
    },
    {
        id: 'upsidePotential',
        dataKey: 'upsidePotential',
        numeric: true,
        disablePadding: false,
        label: 'Upside potential (%)',
        percentage: true,
        formatter: formatter
    },
    {
        id: 'downsidePotential',
        dataKey: 'downsidePotential',
        numeric: true,
        disablePadding: false,
        label: 'Downside potential (%)',
        percentage: true,
        formatter: formatter
    },
    {
        id: 'rating',
        dataKey: 'rating',
        numeric: true,
        disablePadding: false,
        label: 'Rating',
        formatter: ratingFormatter
    },
    {
        id: 'peRatioTTM',
        dataKey: 'peRatioTTM',
        numeric: true,
        disablePadding: false,
        label: 'PE Ratio (TTM)',
        formatter: formatter
    },
    {
        id: 'annualAveragePriceChange',
        dataKey: 'annualAveragePriceChange',
        percentage: true,
        numeric: true,
        disablePadding: false,
        label: 'Avg Annual Price Change (%)',
        formatter: formatter
    },
    {
        id: 'avgAnnualRevenueGrowth',
        dataKey: 'revenueGrowth.annual.avgGrowth',
        percentage: true,
        numeric: true,
        disablePadding: false,
        label: 'Avg Annual Revenue Growth (%)',
        formatter: formatter
    },
    {
        id: 'avgQuarterlyRevenueGrowth',
        dataKey: 'revenueGrowth.quarterly.avgGrowth',
        percentage: true,
        numeric: true,
        disablePadding: false,
        label: 'Avg Quarterly Revenue Growth (%)',
        formatter: formatter
    },
];

export default headCells;