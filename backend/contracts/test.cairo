%lang starknet
from starkware.cairo.common.uint256 import Uint256

@storage_var
func streamee_by_address_by_index(address : felt, id : felt) -> (amount : Uint256, streamee : felt):
end