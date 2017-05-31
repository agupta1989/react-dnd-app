import sum from '../sum';

it("sums number", () => {
    expect(sum(1, 3)).toEqual(4);
    expect(sum(5, 3)).toEqual(8);
});