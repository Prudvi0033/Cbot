export const getRandomStatus = () => {
    const statuses = ["PENDING", "SHIPPED", "DELIVERED"]
    const randomIndex = Math.floor(Math.random() * statuses.length)

    return statuses[randomIndex]
}


export const getPaymentStatus = () => {
    const statuses = ["PAID", "PENDING"]
    const idx = Math.floor(Math.random() * statuses.length)

    return statuses[idx];
}