$(document).ready(function() {
    $('.timeline').each(function() {
        var $timeline = $(this);
        var $timelineItems = $timeline.find('.timeline-item');
        var $timelineLineProgress = $timeline.find('.timeline-line-progress');
        var $mainBall = $timeline.find('.main-ball');
        var $timelineLine = $timeline.find('.timeline-line');

        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();
            var windowHeight = window.innerHeight || document.documentElement.clientHeight;
            return (rect.top <= windowHeight * 0.8);
        }

        function updateTimeline() {
            var timelineTop = $timeline.offset().top;
            var timelineHeight = $timelineLine.height();

            var lastVisibleItemPosition = 0;
            var anyItemVisible = false;

            $timelineItems.each(function(index) {
                var $item = $(this);
                var itemTop = $item.offset().top - timelineTop;
                
                if (isElementInViewport(this)) {
                    anyItemVisible = true;
                    if (!$item.hasClass('active')) {
                        setTimeout(function() {
                            $item.addClass('active');
                        }, 100);
                    }
                    lastVisibleItemPosition = itemTop;
                } else {
                    $item.removeClass('active');
                }
            });

            if (!anyItemVisible) {
                lastVisibleItemPosition = 0;
            }

            $mainBall.css('top', lastVisibleItemPosition + 'px');
            $timelineLineProgress.css('height', lastVisibleItemPosition + 'px');
        }

        $(window).on('scroll resize', updateTimeline);
        updateTimeline();
    });
});


