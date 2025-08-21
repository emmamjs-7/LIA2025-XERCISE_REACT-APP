export function GenerateDurationOption(min: number, max: number, step: number) {
    const options = []
    for (let value = min; value <= max; value += step) {
        options.push({
            key: `${value} min`,
            value: value,
        })
    }
    return options
}