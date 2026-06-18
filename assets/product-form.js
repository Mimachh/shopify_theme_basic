document.addEventListener('alpine:init', () => {
  Alpine.data('productForm', () => ({
    variants: [],
    selectedOptions: [],
    currentVariant: null,
    activeMediaId: null,
    quantity: 1,
    adding: false,
    added: false,
    showSticky: false,
    i18n: {},

    init() {
      const variantsEl = this.$el.querySelector('[data-product-variants]');
      const i18nEl = this.$el.querySelector('[data-product-i18n]');

      this.variants = variantsEl ? JSON.parse(variantsEl.textContent) : [];
      this.i18n = i18nEl ? JSON.parse(i18nEl.textContent) : {};

      const currentId = Number(this.$el.dataset.currentVariantId);
      this.currentVariant = this.variants.find((variant) => variant.id === currentId) || this.variants[0] || null;
      this.selectedOptions = this.currentVariant ? [...this.currentVariant.options] : [];

      const initialMediaId = Number(this.$el.dataset.initialMediaId);
      this.activeMediaId = (this.currentVariant && this.currentVariant.featured_media)
        ? this.currentVariant.featured_media.id
        : initialMediaId || null;

      if (this.$refs.buyBox && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(([entry]) => {
          this.showSticky = !entry.isIntersecting;
        }, { threshold: 0 });
        observer.observe(this.$refs.buyBox);
      }
    },

    get buttonLabel() {
      if (this.adding) return this.i18n.adding;
      if (this.added) return this.i18n.added;
      if (!this.currentVariant || !this.currentVariant.available) return this.i18n.soldOut;
      return this.i18n.addToCart;
    },

    get canAdd() {
      return !!this.currentVariant && this.currentVariant.available && !this.adding;
    },

    isOptionSelected(index, value) {
      return this.selectedOptions[index] === value;
    },

    selectOption(index, value) {
      this.selectedOptions = this.selectedOptions.map((option, i) => (i === index ? value : option));
      this.updateVariant();
    },

    updateVariant() {
      const match = this.variants.find((variant) =>
        variant.options.every((value, i) => value === this.selectedOptions[i])
      );

      if (!match) return;

      this.currentVariant = match;

      if (match.featured_media) {
        this.activeMediaId = match.featured_media.id;
      }

      if (window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set('variant', match.id);
        window.history.replaceState({}, '', url);
      }
    },

    increment() {
      this.quantity += 1;
    },

    decrement() {
      if (this.quantity > 1) this.quantity -= 1;
    },

    async addToCart() {
      if (!this.canAdd) return;

      this.adding = true;

      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ id: this.currentVariant.id, quantity: this.quantity }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.description || error.message || 'cart_error');
        }

        this.added = true;
        document.dispatchEvent(new CustomEvent('cart:updated'));
        setTimeout(() => {
          this.added = false;
        }, 2500);
      } catch (error) {
        this.added = false;
        console.error(error);
      } finally {
        this.adding = false;
      }
    },
  }));
});
