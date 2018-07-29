// Check if the queue is open
document.getElementById('queue-overlay').getBoundingClientRect().top !== 0;

// Open/close the queue
document.getElementById('queue').click();

// Click menu on first queue item.
document.getElementsByClassName('song-row')[0].getElementsByClassName('title-right-items')[0].firstChild.click();

// Menu item for removing from queue (unlikely to be stable)
document.getElementsByClassName('song-menu')[0].getElementsByClassName('goog-menuitem')[4];

// More stable code to get remove from queue item
const songMenu = document.getElementsByClassName('song-menu')[0];
const songMenuItems = Array.prototype.slice.apply(songMenu.getElementsByClassName('goog-menuitem'));
const menuItem = songMenuItems.filter((x) => x.innerText.includes('Remove from queue'))[0];

// Clicking the menu item
['mousedown', 'mouseup'].forEach((evtType) => {
    var event = document.createEvent('MouseEvent');
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
