import Category from '../models/Category';
import Product from '../models/Product';

export const CATEGORIES = 
[
  new Category('c1','Men','ios-man'),
  new Category('c2','Women', 'ios-woman'),
  new Category('c3','Boys', 'md-man'),
  new Category('c4','Girls', 'md-woman'),
  new Category('c5','Household', 'ios-home') 
]
                                                                           
export const PRODUCTS = 
[
  new Product(
    'p1',
    'u1',
    'Red Shirt',
    'c1',
    'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
    'A red t-shirt, perfect for days with non-red weather.',
    5000.00
  ),
  new Product(
    'p2',
    'u1',
    'Blue Carpet',
    'c5',
    'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'Fits your red shirt perfectly. To stand on. Not to wear it.',
    4500.00
  ),
  new Product(
    'p3',
    'u2',
    'Coffee Mug',
    'c5',
    'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
    'Can also be used for tea!',
    1000.00
  ),
  new Product(
    'p4',
    'u3',
    'The Book - Limited Edition',
    'c5',
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
    "What the content is? Why would that matter? It's a limited edition!",
    3500.00
  ),
  new Product(
    'p5',
    'u3',
    'PowerBook',
    'c5',
    'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
    'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
    220000.00
  ),
  new Product(
    'p6',
    'u1',
    'c5',
    'Pen & Paper',
    'https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg',
    "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
    1200.00
  )
];

