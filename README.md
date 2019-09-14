# intrusive-linked-list

A library for supporting intrusively linked lists in TypeScript.

## Example

```TypeScript
class MyNodeClass implements ListEmbeddable<MyNodeClass> {
    value:Number;
    next:ListEmbeddable<MyNodeClass>;
    prev:ListEmbeddable<MyNodeClass>;
};

function createNodeWithValue(value:Number) {
    return {value, next:null, prev:null};
}

var list = createList<MyNodeClass>();
list.add(createNodeWithValue(1));
list.add(createNodeWithValue(2));
list.add(createNodeWithValue(9));
list.add(createNodeWithValue(-13));
for(var i = list.front(); i != list.front().prev; i = i.next) {
    console.log((i as MyNodeClass).value);
}
```

## Release Notes

### 1.0.0

Initial release.
