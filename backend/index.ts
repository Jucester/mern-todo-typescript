import dotenv from 'dotenv';
import app from './src/app';
import {connectDB} from './src/configs/database';

function main() {
    connectDB();
    
    app.listen(app.get('PORT'), () => {
        console.log('Server on port ', app.get('PORT'));
    })
}

main();