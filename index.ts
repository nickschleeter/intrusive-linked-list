

/**
 * Inherit from this class to allow embedding inside an intrusively
 * linked list
 */
export interface ListEmbeddable<T extends ListEmbeddable<T>> {
    next:ListEmbeddable<T>;
    prev:ListEmbeddable<T>;
}

/**
 * Intrusively linked list where the underlying storage exists in the objects
 * being stored rather than allocating a separate node class
 */
export interface List<T extends ListEmbeddable<T>> {
    /**
     * Adds an item to the back of the list
     * @param object The item to add to the list
     */
    add(object:ListEmbeddable<T>):void;
    /**
     * Removes a node from the list.
     * @param node The item to remove from the list
     */
    remove(node:ListEmbeddable<T>):void;
    /**
     * Adds an item after another specified item in a list
     * @param prev The node to insert after
     * @param next The node to insert into the list
     */
    addAfter(prev:ListEmbeddable<T>, next:ListEmbeddable<T>):void;
    /**
     * Retrieves the first element in the list
     */
    front():ListEmbeddable<T>;
    /**
     * Retrieves the last element in the list
     */
    back():ListEmbeddable<T>;
    /**
     * Returns true if empty, false otherwise.
     */
    empty():boolean;
}

/**
 * Creates an empty intrusively linked list
 */
export function createList<T extends ListEmbeddable<T>>():List<T> {
    var front:ListEmbeddable<T> = {
        next:null,
        prev:null
    } as any;
    front.next = front;
    front.prev = front;
    return {
        add:function(object) {
            this.addAfter(front.prev, object);
        },
        addAfter:function(prev, next) {
            next.prev = prev;
            next.next = prev.next;
            prev.next = next;
            next.next.prev = next;
        },
        remove:function(object) {
            object.prev.next = object.next;
            object.next.prev = object.prev;
            // Null out the reference to make it garbage collectable
            (object as any).next = null;
            (object as any).prev = null;
        },
        front:function() {
            return front.next;
        },
        back:function(){
            return front.prev;
        },
        empty:function() {
            // tslint:disable-next-line: triple-equals
            return front.next == front;
        }
    };
}
