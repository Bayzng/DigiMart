// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuyGadget {
    struct Gadget {
        address buyer;
        uint256 price;
        bool isPurchased;
    }

    uint256 public gadgetCounter;
    mapping(uint256 => Gadget) public gadgets;

    event GadgetBought(uint256 indexed gadgetId, address indexed buyer, uint256 price);

    function buyGadget() external payable {
        require(msg.value > 0, "Price should be greater than zero");

        gadgets[gadgetCounter] = Gadget({
            buyer: msg.sender,
            price: msg.value,
            isPurchased: true
        });

        emit GadgetBought(gadgetCounter, msg.sender, msg.value);
        gadgetCounter++;
    }
}
