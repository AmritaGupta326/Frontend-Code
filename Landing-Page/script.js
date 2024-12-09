const eventDate = new Date("November 15, 2024 18:00:00").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("countdown").innerHTML = `
                <p>Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s</p>
            `;

            if (distance < 0) {
                clearInterval(countdownInterval);
                document.getElementById("countdown").innerHTML = "<p>The event has started!</p>";
            }
        };

        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);