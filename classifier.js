/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */

// we first convert their dates of birth to milliseconds to aid comparison
let present_time = Date.now()
let present_year = (new Date()).getFullYear()
function get_age_milliseconds(students){
  let output = students.map(function(student){
    return {name:student.name, regNo: student.regNo, dob:student.dob, age: present_year - (new Date(student.dob)).getFullYear()}
  })
  return output;
}

// next we sort the students according to their date of birth

function sorting_function(student_a, student_b){
  if(student_a.age > student_b.age){
    return 1
  }
  else if(student_a.age < student_b.age){
    return -1
  }
  else{
    return 0
  }
}



function group_students(students){
  let number_of_milliseconds_in_five_years = 24*60*60*1000*365*5;
  let students_grouping = {};
  students_grouping['group1'] = {}
  students_grouping['group1']['members'] = []
  students_grouping['group1']['members'].push(students[0]);
  let ongoing_group_counter = 1;
  let ongoing_group = 'group'+String(ongoing_group_counter);
  let counter =  1
  while(counter < students.length){
  	if(students_grouping[ongoing_group]['members'].length == 3){
      ongoing_group_counter += 1;
      ongoing_group = 'group' + String(ongoing_group_counter);
      students_grouping[ongoing_group] = {}
      students_grouping[ongoing_group]['members'] = [];
      students_grouping[ongoing_group]['members'].push(students[counter]);
      counter += 1;
      continue;
    }
    if(students[counter]['age'] - students_grouping[ongoing_group]['members'][0]['age'] <= 5 ){
      students_grouping[ongoing_group]['members'].push(students[counter]);
    }
    else{
      ongoing_group_counter += 1;
      ongoing_group = 'group' + String(ongoing_group_counter);
      students_grouping[ongoing_group] = {}
      students_grouping[ongoing_group]['members'] = [];
      students_grouping[ongoing_group]['members'].push(students[counter]);
    }
    counter += 1;
  }
  return students_grouping;
}




function classifier(input) {
  // Your code should go here.
  if(!Array.isArray(input)){
  	throw new Error('it is not a valid array type');
  }
  if(!input.length){
  	return {'noOfGroups':0}
  }
  
  let students_with_age_in_milliseconds = get_age_milliseconds(input);
  let students_in_ascending_order = students_with_age_in_milliseconds.sort(sorting_function);
  let grouped_students = group_students(students_in_ascending_order);
  let number_of_groups = Object.keys(grouped_students).length;
  for(let group in grouped_students){
    let sum = 0;
    let regNos = [];
    let group_members_ages_in_years = grouped_students[group]['members'].map(function(member){
      if(grouped_students[group]['members'].length == 0){
      	throw new Error('the array cannot be empty')
      }
      if(!member['age']){
      	throw new Error('invalid age value');
      }
      let age_in_years = member['age']
      sum += age_in_years;
      regNos.push(Number(member.regNo));
      return {name:member.name, dob:member.dob, regNo: member.regNo, age:age_in_years}
    })
    let group_members_length = grouped_students[group]['members'].length
    let oldest = group_members_ages_in_years[group_members_length-1]['age']
    grouped_students[group]['sum'] = Math.round(sum);
    grouped_students[group]['oldest'] = Math.round(oldest);
    let sorted_regNos = regNos.sort((a,b) => { return a - b });
    grouped_students[group]['regNos'] = sorted_regNos;
    grouped_students[group]['members'] = group_members_ages_in_years;
  }
  grouped_students['noOfGroups'] = number_of_groups;
  return grouped_students;
}

module.exports = classifier;
