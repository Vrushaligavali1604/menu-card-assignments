class MenuComponent extends HTMLElement {
  // Default configuration and data
  defaultConfig = {
    wrapperClass: 'menu-wrapper',
    backgroundClass: 'menu-background',
    contentClass: 'menu-content',
    headerClass: 'menu-header',
    restaurantClass: 'restaurant-name',
    discriptionClass: 'restaurant-description',
    cataName: 'cataName',
    categoryClass: 'category-name',
    subcategoryClass: 'subcategory-name',
    pizzaitemClass: 'special-item',
    burgeritemsClass: 'cocktail-item',
    tri1Class:'triangle1',
    tri2Class:'triangle2'
    };
  defaultData = {
    images: [
      { src: './img/pizza.png', class: 'img1', alt: 'img1' }
      
    ],
    restaurant: 'MENU',
    discription: 'menu',
    category: 'PIZZA',
    subcategory: 'BURGER',
    pizzaitems: [
      { name: 'Lamb Pizza', price: '$8.00' },
        { name: 'Beef Pizza', price: '$7.00' },
        { name: 'Apple Pizza', price: '$6.50' },
        { name: 'Carrot Pizza', price: '$4.00' },
        { name: 'Cheese Pizza', price: '$6.50' },
        { name: 'Chicken Pizza' , price:'$6.50'}
    ],
    burgeritems: [
      { name: 'Classic Mojito', price: '$3.99' },
      { name: 'Royal Martini', price: '$3.99' },
      { name: 'Raspberry Mojito', price: '$4.50' },
      { name: 'Retro Margarita', price: '$6.00' },
      { name: 'Classic Margarita', price: '$7.50' },
    ],
  };

  constructor() {
    super();
    this.config = this.defaultConfig;
    this.data = this.defaultData;

    // Attach a shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    // Load external CSS file
    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', 'style.css');
    shadow.appendChild(linkElement);

    // wrapper div created  for the menu card
    this.wrapper = document.createElement('div');
    shadow.appendChild(this.wrapper); 
  }

  static get observedAttributes() {
    return ['config', 'data'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      try {
        if (name === 'config') {
          this.config = { ...this.defaultConfig, ...JSON.parse(newValue) };
        }
        if (name === 'data') {
          this.data = { ...this.defaultData, ...JSON.parse(newValue) };
        }
      } catch (e) {
        console.error(`Invalid JSON for ${name}:`, e);
      }
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.wrapper.innerHTML = ''; // Clear previous content
    const config = this.config || this.defaultConfig;
    const data = this.data || this.defaultData;

    // Apply wrapper class
    this.wrapper.classList.add(config.wrapperClass);  // class define in config

    // Background
    const background = document.createElement('div');
    background.classList.add(config.backgroundClass);
    this.wrapper.appendChild(background);

    const tri1=document.createElement('div');
    tri1.classList.add(config.tri1Class);
    this.wrapper.appendChild(tri1);

    const tri2=document.createElement('div');
    tri2.classList.add(config.tri2Class);
    this.wrapper.appendChild(tri2);
    
    // Images empty div
    const imageContainer = document.createElement('div');
    data.images.forEach((img) => {
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.alt;
        imgElement.classList.add(img.class);
        imageContainer.appendChild(imgElement);
    });
    background.appendChild(imageContainer);


    // Created Menu Content div
    const content = document.createElement('div');
    content.classList.add(config.contentClass);
    this.wrapper.appendChild(content);


    // Header
    const header = document.createElement('div');
    header.classList.add(config.headerClass);

    // Title and subtitle
    const restaurant = document.createElement('h1');
    restaurant.textContent = data.restaurant;
    restaurant.classList.add(config.restaurantClass);
    header.appendChild(restaurant);

    
    content.appendChild(header);

    // Categories
    const cataName = document.createElement('div');
    cataName.classList.add(config.cataName);

    const category = document.createElement('div');
    category.classList.add(config.categoryClass);
    category.textContent = data.category;
    cataName.appendChild(category);

    const subcategory = document.createElement('div');
    subcategory.classList.add(config.subcategoryClass);
    subcategory.textContent = data.subcategory;
    cataName.appendChild(subcategory);

    header.appendChild(cataName);

    // Special items
    const pizzaContainer = document.createElement('div');
    pizzaContainer.classList.add(config.pizzaitemClass);
    (data.pizzaitems || []).forEach((item) => {
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('special-item-wrapper');

        const itemName = document.createElement('div');
        itemName.classList.add('special-item-name');
        itemName.textContent = item.name;

        const itemPrice = document.createElement('div');
        itemPrice.classList.add('special-item-price');
        itemPrice.textContent = item.price;

        itemWrapper.appendChild(itemName);
        itemWrapper.appendChild(itemPrice);
        pizzaContainer.appendChild(itemWrapper);
    });
    content.appendChild(pizzaContainer);

    // Cocktail items
    const burgerContainer = document.createElement('div');
    burgerContainer.classList.add(config.burgeritemsClass);
    data.burgeritems.forEach((item) => {
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('cocktail-item-wrapper');

        const itemName = document.createElement('div');
        itemName.classList.add('cocktail-item-name');
        itemName.textContent = item.name;

        const itemPrice = document.createElement('div');
        itemPrice.classList.add('cocktail-item-price');
        itemPrice.textContent = item.price;

        itemWrapper.appendChild(itemName);
        itemWrapper.appendChild(itemPrice);
        burgerContainer.appendChild(itemWrapper);
    });
    content.appendChild(burgerContainer);
}

}

customElements.define('menu-component', MenuComponent);
