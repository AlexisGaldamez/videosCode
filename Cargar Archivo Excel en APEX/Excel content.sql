WITH files AS (
    SELECT blob_content,
        filename
    FROM apex_application_temp_files
    ORDER BY created_on DESC
    FETCH FIRST 1 ROW ONLY
)
SELECT line_number, 
    col001, 
    col002,
    col003,
    col004,
    col005,
    col006,
    row_info
FROM files f
CROSS JOIN TABLE(apex_data_parser.parse(
    p_content => f.blob_content,
    p_file_name => f.filename
)) excel