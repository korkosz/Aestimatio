module.exports = angular.module('ct.draDrop', [])
    .directive('dragDrop', function () {
        return {
            scope: {
                dropHandler: '&'
            },
            compile(tEl, tAttrs) {
                tAttrs.$set('draggable', true);
                return link;
            }
        };

        function link(scope, el, attrs) {

            el.on('dragstart', handleDragStart);
            el.on('dragover', handleDragOver);
            el.on('drop', drop_handler);
            el.on('dragleave', handleDragLeave);
            el.on('dragend', handleDragEnd);

            function handleDragLeave() {
                el.removeClass('is-drag-over');
            }

            function handleDragStart(e) {
                e.originalEvent.dataTransfer.setData('text/plain',
                    this.dataset.subjectIndex +
                    ' ' + this.dataset.dayIndex);
                el.addClass('is-drag');
            }

            function handleDragOver(e) {
                e.preventDefault();
                // Set the dropEffect to move
                e.originalEvent.dataTransfer.dropEffect = 'move';
                el.removeClass('is-drag-over');
            }

            function drop_handler(e) {
                e.preventDefault();

                e.originalEvent.dataTransfer.dropEffect = 'move';
                el.removeClass('is-drag-over');
                $(e.currentTarget).removeClass('is-drag');

                scope.dropHandler({ e });
            }

            function handleDragEnd() {
                el.removeClass('is-drag');
            }
        }
    });