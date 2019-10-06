const Node = require('./node');

class LinkedList {
    constructor() {
        this.clear();
    }

    _insertFirst(data){
        this._tail = new Node(data);
        this._head = this._tail;
        this.length = 1;
        return this;
    }

    appendHead(data){
        if (this.isEmpty()){
            this._insertFirst(data);
        } else {
            this._head.prev = new Node(data, null, this._head);
            this._head = this._head.prev;
            this.length++;
        }
        return this;
    }

    append(data) {
        if (this.isEmpty()){
            this._insertFirst(data);
        } else {
            this._tail.next = new Node(data, this._tail, null);
            this._tail = this._tail.next;
            this.length++;
        }
        return this;
    }

    deleteHead(){
        if (!this.isEmpty()){
            if (this.isSizeOne()) return this.clear();
            this._head = this._head.next;
            this._head.prev = null;
        }
        return this;
    }

    deleteTail(){
        if (!this.isEmpty()){
            if (this.isSizeOne()) return this.clear();
            this._tail = this._tail.prev;
            this._tail.prev = null;
        }
        return this;
    }

    head() {
        return (this._head !== null)? this._head.data : null;
    }

    tail() {
        return (this._tail !== null)? this._tail.data : null;
    }

    _isIndexValid(index){
        return (index >= 0) && (index < this.length);
    }

    _isIndexValidInsert(index){
        return (index >= 0) && (index <= this.length);
    }

    _nodeAt(index){
        if (this.isEmpty() || !this._isIndexValid(index)) return null;

        let node = this._head;
        for (let i = 0; i < index; i++){
            if (node == null) return null;
            node = node.next;
        }
        return node;
    }

    at(index) {
        let node = this._nodeAt(index);
        return (node != null)? node.data : null;
    }

    insertAt(index, data) {
        if (!this.isEmpty() && this._isIndexValidInsert(index)){
            if (index == 0) return this.appendHead(data);
            if (index == this.length) return this.append(data);
            let next = this._nodeAt(index);
            let prev = next.prev;
            next.prev = new Node(data, prev, next);
            if (prev !== null) prev.next = next.prev;
            this.length++;
        }
        return this;
    }

    isEmpty() {
        return this._head === null;
    }

    isSizeOne(){
        return this._head === this._tail;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if (!this.isEmpty() && this._isIndexValid(index)){
            if (index == 0) return this.deleteHead();
            if (index == this.length-1) return this.deleteTail();
            let prev = this._nodeAt(index - 1);
            if (prev.next.next !== null) prev.next.next.prev = prev;
            prev.next = prev.next.next;
        }
        return this;
    }

    reverse() {
        if (!this.isEmpty()){
            let oldListEntry = this._head;
            let current = oldListEntry;
            let length = 0;
            while (current != null){
                this.appendHead(current.data);
                current = current.next;
                length++;
            }
            this._tail = oldListEntry.prev;
            this._tail.next = null;
            this.length = length;
        }
        return this;
    }

    indexOf(data) {
        let current = this._head;
        let index = 0;
        while (current != null){
            if (current.data === data) return index;
            current = current.next;
            index++;
        }
        return -1;
    }
}

module.exports = LinkedList;
