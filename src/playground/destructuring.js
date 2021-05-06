const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
const [ , city, state = 'New York'] = address;
console.log(`You are in ${city} ${state}.`);

const item = ['Coffee (iced)', '$3.00', '$3.50', '$3.75'];
const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} cost ${mediumPrice}`);
