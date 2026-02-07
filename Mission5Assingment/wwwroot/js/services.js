// Tutoring calculator - uses jQuery per assignment requirements
(function () {
    var HOURLY_RATE = 25.00;

    function parseRateText(text) {
        if (!text) return HOURLY_RATE;
        var cleaned = String(text).replace(/[^0-9.]/g, '');
        var n = parseFloat(cleaned);
        return isNaN(n) ? HOURLY_RATE : n;
    }

    function calculateTotal() {
        var $hours = $('#hours');
        var $total = $('#total');
        var $rate = $('#rate');

        if (!$hours.length || !$total.length) return;

        var hours = parseFloat($hours.val());

        if (isNaN(hours) || hours <= 0) {
            $hours.addClass('is-invalid');
            $total.val('');
            return;
        }

        $hours.removeClass('is-invalid');
        var rate = parseRateText($rate.length ? $rate.val() : null);
        var total = hours * rate;
        $total.val('$' + total.toFixed(2));
    }

    // Expose for optional inline onclick
    window.calculateTotal = calculateTotal;

    $(function () {
        $('#calculate').attr('type', 'button').on('click', function (e) {
            e.preventDefault();
            calculateTotal();
        });

        $('#hours').on('input', function () {
            var val = parseFloat($(this).val());
            if (!isNaN(val) && val > 0) $(this).removeClass('is-invalid');
        });
    });
})();
