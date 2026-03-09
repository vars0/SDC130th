const images = import.meta.glob('./public/pic/*.jpg', { eager: true, query: '?url', import: 'default' });
console.log(images);
