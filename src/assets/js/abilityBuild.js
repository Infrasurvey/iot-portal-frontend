import { AbilityBuilder, Ability } from '@casl/ability'

export default function defineRulesFor(groups,organizations,is_admin){
  const { can, cannot, build } = new AbilityBuilder(Ability);
    if(is_admin != 0){
        can('manage','all')
    }
    else{
      if(organizations.length > 0){
        can('manage','organization')
      }
      var orga_ids = []
      organizations.forEach(orga => {
        can('manage_orga',String(orga.id))
        orga_ids.push(String(orga.id))
      })

      groups.forEach(group => {
        if(orga_ids.includes(String(group.organization_id))){
          can('manage_install',String(group.id))
        }
        can('read_install',String(group.id))
      })
      
    }
  return build();
  }