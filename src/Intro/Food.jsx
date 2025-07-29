import ChickenOne from '../public/Chicken one.avif';
import ChickenTwo from '../public/Chicken two.avif';

function FavoriteFoodOne() {
    return <div className='food'>
                <h2>Chicken one</h2>
                <p>This is my first favorite meal</p>
                <img src="../public/Chicken one.avif" alt="Roasted chicken" />
            </div>
}

function FavoriteFoodTwo() {
    return  <div className='food'>
                <h2>Chicken two</h2>
                <p>This is my second favorite meal</p>
                <img src="../public/Chicken two.avif" alt="Fried chicken" />
            </div>
}

export { FavoriteFoodOne, FavoriteFoodTwo };