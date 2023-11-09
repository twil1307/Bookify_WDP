
export function getPriceRanges(prices) {
    // console.log('run getPriceRanges');
    const range = 20;
    let baseRange = 0;
    const maxPriceRoundedToNearestHundred = Math.ceil(getMaxPrice(prices) / 100) * 100;
    return [Array.from(new Array(Math.ceil(maxPriceRoundedToNearestHundred / range) + 4)).map(() => {
        const priceRange = {
            range: {
                min: baseRange,
                max: baseRange + range
            }
        } 
        baseRange += range;
        return priceRange;
    }), baseRange]
}

export function getFrequencyInRange(prices, priceRanges) {
    return priceRanges.map((priceRange) => {
        const { range } = priceRange;
        let numberOfHotels = 0;
        prices.forEach(({ price }) => {
            if (price >= range.min && price <= range.max)
                numberOfHotels++;
        })    
        return {
            ...priceRange,
            numberOfHotels
        }
    })
}

export function getMaxFrequency(priceFrequencies) {
    return Math.max(...priceFrequencies.map(({ numberOfHotels }) => numberOfHotels))
}

function getMaxPrice(prices) {
    return Math.max(...prices.map(({ price }) => price));
}
