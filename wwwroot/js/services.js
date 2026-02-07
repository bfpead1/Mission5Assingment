(function () {
    console.log('services.js: executing');

    function parseRateText(text) {
        if (!text) return 25.00;
        var cleaned = String(text).replace(/[^0-9.]/g, '');
        var n = parseFloat(cleaned);
        return isNaN(n) ? 25.00 : n;
    }

    function calculateTotal() {
        try {
            var hoursEl = document.getElementById('hours');
            var totalEl = document.getElementById('total');
            var rateEl = document.getElementById('rate');

            if (!hoursEl || !totalEl) {
                console.warn('services.js: required elements not found (#hours or #total).');
                return;
            }

            var hours = parseFloat(hoursEl.value);
            console.log('services.js: calculateTotal called — hours raw=', hoursEl.value, 'parsed=', hours);

            if (isNaN(hours) || hours <= 0) {
                hoursEl.classList.add('is-invalid');
                totalEl.value = '';
                console.warn('services.js: invalid hours');
                return;
            }

            hoursEl.classList.remove('is-invalid');

            var rate = parseRateText(rateEl ? rateEl.value : null);
            var total = hours * rate;
            totalEl.value = '$' + total.toFixed(2);
            console.log('services.js: total=', total);
        } catch (err) {
            console.error('services.js: calculateTotal error', err);
        }
    }

    // Expose function to global so button can call it inline
    window.calculateTotal = calculateTotal;

    // If jQuery is available, attach handlers too (keeps previous behavior)
    if (window.jQuery) {
        (function ($) {
            try {
                console.log('services.js: jQuery found — attaching handlers');

                // Make sure button not submitting
                $('#calculate').attr('type', 'button');

                $(document).off('click.services', '#calculate').on('click.services', '#calculate', function (e) {
                    e.preventDefault();
                    calculateTotal();
                });

                $(document).off('input.services', '#hours').on('input.services', '#hours', function () {
                    var val = parseFloat($(this).val());
                    if (!isNaN(val) && val > 0) $(this).removeClass('is-invalid');
                });

                console.log('services.js: jQuery handlers attached');
            } catch (err) {
                console.error('services.js jQuery init error:', err);
            }
        })(window.jQuery);
    } else {
        console.warn('services.js: jQuery not found — using vanilla fallback. Inline call will still work.');
    }
})();