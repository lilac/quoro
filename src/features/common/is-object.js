export default obj => typeof obj === 'object' ? (!Array.isArray && obj !== null) : false;
