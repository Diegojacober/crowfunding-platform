// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crowdfunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint target;
        uint deadline;
        uint amountCollected;
        string image;
        address[] donators;
        uint[] donations;
    }

    mapping(uint => Campaign) public campaings;

    uint public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint _target,
        uint _deadline,
        string memory _image
    ) public returns (uint) {
        Campaign storage campaing = campaings[numberOfCampaigns];
        campaing.deadline = _deadline;
        campaing.description = _description;
        campaing.title = _title;
        campaing.target = _target;
        campaing.owner = _owner;
        campaing.image = _image;
        campaing.amountCollected = 0;
        require(
            campaing.deadline > block.timestamp,
            "The deadline must be a date in the future!"
        );
        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint _id) public payable {
        uint amount = msg.value;
        Campaign storage campaing = campaings[_id];
        campaing.donators.push(msg.sender);
        campaing.donations.push(amount);

        (bool sent, ) = payable(campaing.owner).call{value: amount}("");

        if (sent) {
            campaing.amountCollected += amount;
        }
    }

    function getDonators(
        uint _id
    ) public view returns (address[] memory, uint[] memory) {
        return (campaings[_id].donators, campaings[_id].donations);
    }

    function getCampaigns()
        public
        view
        returns (Campaign[] memory allCampaigns)
    {
        allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaings[i];
            allCampaigns[i] = item;
        }
    }
}
