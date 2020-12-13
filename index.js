"use strict";
exports.__esModule = true;
/**
 * Creates an empty intrusively linked list
 */
function createList() {
    var front = {
        next: null,
        prev: null
    };
    front.next = front;
    front.prev = front;
    return {
        add: function (object) {
            this.addAfter(front.prev, object);
        },
        addAfter: function (prev, next) {
            next.prev = prev;
            next.next = prev.next;
            prev.next = next;
            next.next.prev = next;
        },
        remove: function (object) {
            object.prev.next = object.next;
            object.next.prev = object.prev;
            // Null out the reference to make it garbage collectable
            object.next = null;
            object.prev = null;
        },
        front: function () {
            return front.next;
        },
        back: function () {
            return front.prev;
        },
        empty: function () {
            // tslint:disable-next-line: triple-equals
            return front.next == front;
        }
    };
}
exports.createList = createList;
