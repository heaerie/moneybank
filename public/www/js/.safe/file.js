<!--

//alert('import file');
//alert("F:001:###in fields..");
// This example shows file manipulation routines: it echoes
// the contents of itself (the script file).
// Created with Antechinus® JavaScript Editor
// Copyright© 2009 C Point Pty Ltd

fh = fopen(getScriptPath(), 0); // Open the file for reading
if(fh!=-1) // If the file has been successfully opened
{
    length = flength(fh);         // Get the length of the file    
    str = fread(fh, length);     // Read in the entire file
    fclose(fh);                    // Close the file
    
// Display the contents of the file    
    write(str);    
}
//alert('import fields done');
-->
