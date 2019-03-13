/**
 * This is the entry point to the program.
 *
 * @param {number} noOfWashes The number of times the laundry machine can clean a dirty sock
 * @param {number[]} cleanPile The array of clean socks
 * @param {number[]} dirtyPile The array of dirty socks to wash
 */


function arrange_socks(socks_pile, socks_container){
	for(let i = 0; i < socks_pile.length; i++){
		if(socks_container.hasOwnProperty(socks_pile[i])){
			socks_container[socks_pile[i]] +=1;
		}
		else{
			socks_container[socks_pile[i]] = 1;
		}
	}
	return socks_container
}


function get_pairs(number_of_washes,clean_socks,dirty_socks){
	let clean_pairs = 0;
	let remaining_colors = [];
	for(let color in clean_socks){
		clean_pairs += Math.floor(clean_socks[color]/2);
		clean_socks[color] = clean_socks[color] % 2;
		if(clean_socks[color] == 1){
			remaining_colors.push(color);
		}
	}
	// we give a higher priority to sock colors in remaining_colors array
	for(let color in dirty_socks){
		if(number_of_washes == 0){
			break;
		}
		if(remaining_colors.indexOf(color) > -1){
			dirty_socks[color] -= 1;
			clean_socks[color] = 0;
			number_of_washes -= 1
			clean_pairs += 1;
		}
	}
	// we now check for other socks in the dirty_socks array
	for(let color in dirty_socks){
		if(number_of_washes <= 0){
			break;
		}
		if(dirty_socks[color] > 1){
			let possible_pairs = Math.floor((dirty_socks[color])/2);
			while(possible_pairs > 0 && number_of_washes >= 2){
				number_of_washes -= 2;
				possible_pairs -= 1;
				clean_pairs += 1;
			}
		}
	}
	return clean_pairs;
}



function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  	// Your solution should go here.
  	let clean_socks = arrange_socks(cleanPile,{});
	let dirty_socks = arrange_socks(dirtyPile,{})
	let max_pairs = get_pairs(noOfWashes,clean_socks,dirty_socks)
	return max_pairs
}

module.exports = getMaxPairs;
