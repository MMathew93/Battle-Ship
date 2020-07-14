import { shipFactory } from '../Factories/Ship.js'

test('test the length of ship', () => {
    let ship= shipFactory(5)
    expect(ship.length).toEqual(5)
});

test('damage returns the correct array length filled false', () => {
    let ship= shipFactory(5)
    expect(ship.damage).toEqual([false, false, false, false, false])
});

//array starts at 0
test('if hit updates damage array in correct location', () => {
    let ship= shipFactory(5)
    expect(ship.hit(4)).toEqual([false, false, false, false, true])
})

test('test if ship has sunk', () => {
    let ship= shipFactory(5)
    ship.hit(0)
    ship.hit(1)
    ship.hit(2)
    ship.hit(3)
    ship.hit(4)
    expect(ship.isSunk()).toBe(true)
});

test('test if ship has sunk', () => {
    let ship= shipFactory(5)
    ship.hit(0)
    ship.hit(1)
    ship.hit(2)
    ship.hit(3)
    expect(ship.isSunk()).toBe(false)
});