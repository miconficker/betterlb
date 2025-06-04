#!/usr/bin/env python3
"""
Script to clean and flatten contact information in legislative.json

This script will:
1. Flatten nested contact objects that have a 'contact' key inside
2. Merge 'direct' and 'local' phone numbers into a single 'contact' field
"""

import json
from pathlib import Path
from typing import Any, Dict, List, Union

def clean_contact(contact_data: Union[Dict, str, None]) -> tuple[Union[str, None], str]:
    """
    Clean and flatten contact information and extract email.
    
    Args:
        contact_data: The contact information to clean
        
    Returns:
        tuple: A tuple containing (cleaned_contact, email)
              - cleaned_contact: The cleaned contact information (str or None)
              - email: The email address if found (str or None)
    """
    if not contact_data:
        return None, None
        
    email = None
    
    # If it's already a string, return as is with no email
    if isinstance(contact_data, str):
        return contact_data, None
        
    # Extract email if it exists
    if 'email' in contact_data:
        email = contact_data['email']
    
    # If it's a dict with a 'contact' key, use that value
    if 'contact' in contact_data:
        return contact_data['contact'], email
        
    # If it has 'direct' and/or 'local' keys, merge them
    contact_parts = []
    if 'direct' in contact_data and contact_data['direct']:
        contact_parts.append(contact_data['direct'])
    if 'local' in contact_data and contact_data['local']:
        contact_parts.append(f"local {contact_data['local']}")
    
    if contact_parts:
        return "; ".join(contact_parts), email
        
    # If we get here, return the original data
    return contact_data, email

def process_data(data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Process the legislative data to clean and flatten contact information.
    
    Args:
        data: The legislative data to process
        
    Returns:
        List[Dict[str, Any]]: The processed data with cleaned contact information
    """
    def process_contact(obj: Dict[str, Any], contact_key: str = 'contact') -> None:
        """Process contact information in a single object."""
        if contact_key in obj:
            contact_data = obj[contact_key]
            cleaned_contact, email = clean_contact(contact_data)
            
            # Update or remove the contact field
            if cleaned_contact is not None:
                obj[contact_key] = cleaned_contact
            else:
                obj.pop(contact_key, None)
            
            # Add email as a separate field if it exists
            if email:
                obj['email'] = email
    
    for item in data:
        # Process top-level items
        if isinstance(item, dict):
            # Process officials
            if 'officials' in item:
                for official in item['officials']:
                    process_contact(official)
            
            # Process secretariat officials
            if 'secretariat_officials' in item:
                for official in item['secretariat_officials']:
                    process_contact(official)
            
            # Process house members
            if 'house_members' in item:
                for member in item['house_members']:
                    process_contact(member)
            
            # Process party list representatives
            if 'party_list_representatives' in item:
                for rep in item['party_list_representatives']:
                    process_contact(rep)
            
            # Process house committees chairpersons and vice-chairpersons
            if 'house_committees' in item:
                for role in ['chairpersons', 'vice_chairpersons']:
                    if role in item['house_committees']:
                        for person in item['house_committees'][role]:
                            process_contact(person)
            
            # Process special committees
            if 'special_committees' in item:
                for committee in item['special_committees']:
                    if isinstance(committee, dict):
                        # Special case for committee chairperson contact
                        if 'chairperson_contact' in committee:
                            process_contact(committee, 'chairperson_contact')
                        process_contact(committee)
            
            # Process any other direct contact fields in the item
            process_contact(item)
    
    return data

def main():
    # Path to the legislative.json file
    data_dir = Path(__file__).parent.parent / 'src' / 'data' / 'directory'
    input_file = data_dir / 'legislative.json'
    output_file = data_dir / 'legislative_cleaned.json'
    
    print(f"Reading data from {input_file}...")
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print("Processing contact information...")
    processed_data = process_data(data)
    
    print(f"Writing cleaned data to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(processed_data, f, indent=2, ensure_ascii=False)
    
    print("Done!")

if __name__ == "__main__":
    main()
