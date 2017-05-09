export default {
  formatDate (date) {
    const currentDate = new Date();
    const givenDate = new Date(date);
    const timeDiff = Math.abs(currentDate.getTime() - givenDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffDays > 7 ) {
      return givenDate.toDateString();
    } else {
      return `${diffDays} ${diffDays == 1 ? "day" : "days"} ago`;
    }
  },
  formatPrice (price) { // Cents to dollars
    return `$${(price/100).toFixed(2)}`;
  },
  getRandomNumber () {
    return Math.floor(Math.random()*1000);
  },
};