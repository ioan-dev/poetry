class Accordion {
    selectors = {
        root: '[data-js-accordion]',
        item: '[data-js-accordion-item]',
        trigger: '[data-js-accordion-trigger]',
        content: '[data-js-accordion-content]',
    };

    stateClasses = {
        isActive: 'is-active',
    };

    config = {
        singleActive: true,
        allowToggle: true,
    };

    constructor(options = {}) {
        this.config = {...this.config, ...options};
        this.rootElements = document.querySelectorAll(this.selectors.root);

        this.rootElements.forEach(root => {
            const items = root.querySelectorAll(this.selectors.item);
            this.bindEvents(items);
        });
    }

    onTriggerClick = (event) => {
        const trigger = event.currentTarget;
        const item = trigger.closest(this.selectors.item);
        const content = item.querySelector(this.selectors.content);

        if (this.config.singleActive) {
            item.closest(this.selectors.root).querySelectorAll(this.selectors.item).forEach(otherItem => {
                const otherTrigger = otherItem.querySelector(this.selectors.trigger);
                const otherContent = otherItem.querySelector(this.selectors.content);
                if (otherItem !== item) {
                    otherTrigger.classList.remove(this.stateClasses.isActive);
                    otherContent.classList.remove(this.stateClasses.isActive);
                }
            });
        }

        if (!this.config.allowToggle && trigger.classList.contains(this.stateClasses.isActive)) {
            return;
        }

        trigger.classList.toggle(this.stateClasses.isActive);
        content.classList.toggle(this.stateClasses.isActive);
    };

    bindEvents(items) {
        items.forEach(item => {
            const trigger = item.querySelector(this.selectors.trigger);
            if (trigger) {
                trigger.addEventListener('click', this.onTriggerClick);
            }
        });
    }
}

export default Accordion;