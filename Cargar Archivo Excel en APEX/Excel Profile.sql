SELECT apex_data_parser.discover(
    p_content => f.blob_content,
    p_file_name => f.filename
) information
FROM apex_application_temp_files f
ORDER BY created_on DESC
FETCH FIRST 1 ROW ONLY