// SPDX-License-Identifier: MIT

pragma solidity 0.8.18; 
contract ERC20 { 

    address public immutable i_owner; 
    uint256 public totalSupply;
    string public nameOfTheContract;
    string public symbolOfTheContract; 

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowances;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);

    constructor (string memory name_, string memory symbol_, uint256 _totalSupply) {
        nameOfTheContract = name_;
        symbolOfTheContract = symbol_;
        i_owner = msg.sender;
        totalSupply = _totalSupply * 1 ether;
        balances[i_owner]=totalSupply;
    }

    function name() public view returns (string memory) {
        return nameOfTheContract;
    }

    function symbol () public view returns (string memory) {
        return symbolOfTheContract;
    }

    function decimals() public pure returns (uint8) {
        return 18;
    }

    function balanceOf (address account) external view returns (uint256) {
        return balances[account];
    }

    function allowance (address owner, address spender) external view returns (uint256) {
        return allowances[owner][spender]; 
    }

    function mint (address account, uint256 amount) external onlyOwner {
        require(account != address(0), "The account cannot be zero address");
        _mint(account, amount);
    }

    function _mint(address account, uint256 amount) internal {
        balances[account]+=amount;
        totalSupply+= amount;
        emit Transfer(address(0), account, amount);
    }

    function burn (address account, uint256 amount) external onlyOwner {
        require(account != address(0), "The account cannot be zero address");
        require(amount <= totalSupply, "You cannot burn this amount of tokens");
        _burn(account, amount);
    }

    function _burn(address account, uint256 amount) internal {
        balances[account]-=amount;
        totalSupply-= amount;
        emit Transfer(account, address(0), amount);
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
        address owner = msg.sender;
        _transfer(owner, recipient, amount);
        return true;
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require (from != address(0), "Transfer from the zero address");
        require (to != address(0), "Transfer to the zero address");

        uint256 fromBalance = balances[from];

        require(fromBalance >= amount, "Non-sufficient balance");

        unchecked {
            balances[from] = fromBalance - amount;
            balances[to]+= amount;
        }

        emit Transfer(from, to, amount);
    }

    function approve (address spender, uint256 currentAmount, uint256 amount) public returns (bool) {
        if (allowances[msg.sender][spender] == currentAmount) {
            address owner = msg.sender;
            _approve(owner, spender, amount);
            return true;
        } else {
            return false;
        }
    }

    function _approve (address owner, address spender, uint256 amount) internal {
        allowances[owner][spender]=amount;
        emit Approval(owner, spender, amount);
    }

    function transferFrom (address from, address to, uint256 amount) public {
        require (amount <= allowances[from][msg.sender], "Not enough funds");
        _transfer(from, to, amount);
        allowances[from][msg.sender]-=amount;
    }


    function increaseAllowance(address spender, uint256 amount) external {
        require(spender != address(0), "Spender is the zero address");
        allowances[msg.sender][spender]+= amount; 
        emit Approval(msg.sender, spender, allowances[msg.sender][spender]);
    }

    function decreaseAllowance (address spender, uint256 amount) external {
        require(spender != address(0), "Spender is the zero address");
        require(allowances[msg.sender][spender] >= amount, "You cannot decrease this amount or to this spender"); 
        allowances[msg.sender][spender]-= amount;
        emit Approval(msg.sender, spender, allowances[msg.sender][spender]);
    }

    modifier onlyOwner() {
        require(msg.sender == i_owner, "Not Owner");
        _;
    }
    
}
