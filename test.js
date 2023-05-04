// multiplication function
    function multiplication(num1, num2) {
        if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return NaN;
        }
        return num1 * num2;
    }
  
  // test multiplication function
    describe('multiplication function', () => {
        it('returns the product of two input numbers', () => {
        expect(multiplication(2, 3)).toEqual(6);
        expect(multiplication(0, 100)).toEqual(0);
        expect(multiplication(-2, 5)).toEqual(-10);
        expect(multiplication(2, 0.5)).toEqual(1);
        });
  
    it('only accepts numeric inputs', () => {
      expect(multiplication(3)).toEqual(NaN);
      expect(multiplication()).toEqual(NaN);
      expect(multiplication("2", 3)).toEqual(NaN);
      expect(multiplication(2, "3")).toEqual(NaN);
      expect(multiplication("2", "3")).toEqual(NaN);
    });
  });
  
  // concatOdds function
    function concatOdds(arr1, arr2) {
        const set1 = new Set(arr1.filter(num => num % 2 !== 0));
        const set2 = new Set(arr2.filter(num => num % 2 !== 0));
        const intersection = new Set([...set1].filter(num => set2.has(num)));
        return Array.from(intersection).sort((a, b) => a - b);
    }
  
  // test concatOdds function
    describe('concatOdds function', () => {
        it('returns an array of odd integers, in ascending order, that are present in both input arrays', () => {
        expect(concatOdds([3, 2, 1], [9, 1, 1, 1, 4, 15, -1])).toEqual([-1, 1, 3, 9, 15]);
        expect(concatOdds([1, 2, 3], [4, 5, 6])).toEqual([1, 3, 5]);
        expect(concatOdds([], [1, 3, 5])).toEqual([1, 3, 5]);
        expect(concatOdds([2, 4, 6], [1, 3, 5])).toEqual([]);
        expect(concatOdds([3, "2", 1], [9, 1, "hello", 1, 4, 15, -1])).toEqual([-1, 1, 3, 9]);
        expect(concatOdds([], [])).toEqual([]);
        expect(concatOdds([1, 3, 5, 5], [5, 7, 9, 9])).toEqual([5]);
        });
  
    it('handles empty and non-numeric inputs', () => {
      expect(concatOdds([], [])).toEqual([]);
      expect(concatOdds([1, 2, 3], [])).toEqual([1, 3]);
      expect(concatOdds([], [4, 5, 6])).toEqual([5]);
      expect(concatOdds([1, "hello", 3], [4, NaN, 5])).toEqual([1, 3, 5]);
    });
  
    it('handles duplicates', () => {
      expect(concatOdds([1, 3, 3], [3, 5, 5])).toEqual([3]);
    });
  });
  
// shopping cart checkout feature

    // Define a function to handle the checkout process
    function checkout(cart, user) {
        // If the cart is empty, show an error message
        if (cart.length === 0) {
        console.log("Error: Your cart is empty.");
        return;
        }
  
    // If the user is not logged in, prompt them to either create an account or log in
    if (!user) {
      let response = prompt("Would you like to check out as a guest, create an account, or log in?");
  
      // If the user chooses to create an account, prompt them to enter their information and add them to the database
      if (response === "create account") {
        let username = prompt("Enter a username:");
        let password = prompt("Enter a password:");
        let email = prompt("Enter your email address:");
        let shippingAddress = prompt("Enter your shipping address:");
  
        // Add the new user to the database
        addToDatabase(username, password, email, shippingAddress);
  
        // Set the current user to the new user
        user = {username: username, email: email, shippingAddress: shippingAddress};
      }
      // If the user chooses to log in, prompt them to enter their username and password and retrieve their information from the database
      else if (response === "log in") {
        let username = prompt("Enter your username:");
        let password = prompt("Enter your password:");
  
        // Check the database for a user with the entered username and password
        user = checkDatabase(username, password);
  
        // If the user is not found, show an error message
        if (!user) {
          console.log("Error: Invalid username or password.");
          return;
        }
      }
      // If the user chooses to check out as a guest, continue without creating an account or logging in
      else {
        user = null;
      }
    }
  
    // Calculate the total cost of the order
    let totalCost = calculateTotalCost(cart);
  
    // Prompt the user to enter their payment information
    let paymentInfo = promptForPaymentInfo();
  
    // Process the payment and create the order in the database
    let orderId = processPayment(user, paymentInfo, cart, totalCost);
  
    // Show the user a summary of their order and thank them for their purchase
    showOrderSummary(orderId, totalCost);
  }
  
// Sample usage:
  
  const cartItems = [  { name: "Item 1", price: 10, quantity: 2 },  { name: "Item 2", price: 5, quantity: 3 },  { name: "Item 3", price: 20, quantity: 1 }];

    // Calculate the total cost of the items in the cart
    const totalCost = calculateTotalCost(cartItems);
    console.log(totalCost); // Output: 50

    // Prompt the user for payment information and return an object with the information
    const paymentInfo = promptForPaymentInfo();
    console.log(paymentInfo); // Output: { cardNumber: "<entered card number>", expirationDate: "<entered expiration date>", cvv: "<entered cvv code>" }

    // Process the payment using the payment information and the total cost of the order
    const paymentSuccessful = processPayment(paymentInfo, totalCost);
    console.log(paymentSuccessful); // Output: true or false, depending on whether the CVV code is a valid 3-digit number

    // Show an order summary with the items in the cart, the total cost, and whether the payment was successful
    showOrderSummary(cartItems, totalCost, paymentSuccessful);
    // Output (if payment was successful):
    // Order summary:
    // 2 x Item 1: $20
    // 3 x Item 2: $15
    // 1 x Item 3: $20
    // Total cost: $55
    // Payment successful!

    // Output (if payment failed):
    // Order summary:
    // 2 x Item 1: $20
    // 3 x Item 2: $15
    // 1 x Item 3: $20
    // Total cost: $55
    // Payment failed. Please check your payment information and try again.