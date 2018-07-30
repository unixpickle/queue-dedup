(function () {

    function removeDuplicates() {
        const wasOpen = isQueueOpen();
        if (!wasOpen) {
            toggleQueue();
        }

        let runNext;
        runNext = (removedDup) => {
            if (!removedDup) {
                return false;
            }
            return removeNextDuplicate().then(runNext);
        };

        if (!wasOpen) {
            return runNext(true).then(() => toggleQueue());
        } else {
            return runNext(true);
        }
    }

    function removeNextDuplicate() {
        let rows = songRows();
        for (let i = rows.length - 1; i >= 0; i--) {
            const row = rows[i];
            const prefix = rows.slice(0, i);
            if (prefix.filter((x) => x.songTitle() === row.songTitle()).length) {
                return row.remove();
            }
        }
        return Promise.resolve(false);
    }

    function isQueueOpen() {
        return document.getElementById('queue-overlay').getBoundingClientRect().top !== 0;
    }

    function toggleQueue() {
        document.getElementById('queue').click();
    }

    function songRows() {
        const elems = document.getElementById('queue-overlay').getElementsByClassName('song-row');
        return Array.prototype.slice.apply(elems).map((e) => new SongRow(e));
    }

    function findRemoveMenuItem() {
        const songMenu = document.getElementsByClassName('song-menu')[0];
        const rawMenuItems = songMenu.getElementsByClassName('goog-menuitem')
        const menuItems = Array.prototype.slice.apply(rawMenuItems);
        return menuItems.filter((x) => x.innerText.includes('Remove from queue'))[0];
    }

    function pressMenuItem(menuItem) {
        ['mousedown', 'mouseup'].forEach((evtType) => {
            const event = document.createEvent('MouseEvent');
            event.initMouseEvent(
                evtType,
                true, true,
                window, null,
                0, 0, 0, 0,
                false, false, false, false,
                0, null
            );
            menuItem.dispatchEvent(event);
        });
    }

    class SongRow {
        constructor(elem) {
            this.element = elem;
            this._title = null;
        }

        songTitle() {
            if (this._title === null) {
                const titleElem = this.element.getElementsByClassName('song-title')[0];
                this._title = titleElem.textContent.trim();
            }
            return this._title;
        }

        remove() {
            this.openMenu();
            pressMenuItem(findRemoveMenuItem());
            return new Promise((resolve) => {
                let interval;
                interval = setInterval(() => {
                    if (!this.element.parentNode) {
                        clearInterval(interval);
                        resolve(true);
                    }
                }, 100);
            });
        }

        openMenu() {
            const rightItems = this.element.getElementsByClassName('title-right-items')[0];
            const button = rightItems.getElementsByTagName('paper-icon-button')[0];
            button.click();
        }
    }

    removeDuplicates();

})();