const countdown = (() => {
    // Set the date we're counting down to
    const countDownDate = new Date("Mar 14, 2021 23:59:00").getTime();

    // Update the count down every 1 second
    const x = setInterval(function() {

      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result
      document.getElementById('cs-days').innerHTML = days;
      document.getElementById('cs-hours').innerHTML = hours;
      document.getElementById('cs-minutes').innerHTML = minutes;
      document.getElementById('cs-seconds').innerHTML = seconds;

      // when countdown is over
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("cs-container").innerHTML = "LAUNCHED";
      }
    }, 1000);
  })();
