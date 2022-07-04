HTMLElement.prototype.delegate = function(eventType, childSelector, handler) {
    this.addEventListener(eventType, function(event) {
        let target = event.target;
        let closestElement = target.closest(childSelector);
        if (closestElement !== null && this.contains(closestElement)) {
            handler.call(target, event);
        }
    });
}

console.log("%cPrototype manipulation complete.", "color: green");