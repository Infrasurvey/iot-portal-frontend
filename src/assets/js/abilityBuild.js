import { AbilityBuilder, Ability } from '@casl/ability'

export default function defineRulesFor(groups){
  const { can, cannot, build } = new AbilityBuilder(Ability);
    console.log(groups);
    for(var groupname in groups){
      if(groupname == "admin"){
          can('manage','all')
      }
      else{
        if(groups[groupname] == 1){
          can('manage',groupname)
        }
        else{
          can('read',groupname)
        }
      }
    }

  return build();
  
  }