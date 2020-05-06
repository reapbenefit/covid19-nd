export interface IAdmin{
    place_org_id: number,
    place_org_name: string,
    place_org_address: string,
    place_org_lat: number, 
    place_org_long: number,
    pol_locale_id: number,
    place_org_category: string,
    place_org_subcategory: string,
    ward_id: number,
    ac_id: number,
    city_id: number,
    place_org_person_incharge: string,
    place_org_number: string,
    place_org_jurisdiction: string,
    info: string,
    impact: string
    flagged_as_erronous: boolean,
    logical_delete: boolean
}