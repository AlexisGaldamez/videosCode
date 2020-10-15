DECLARE
    CURSOR c_files IS
        WITH files AS (
        SELECT blob_content,
            filename
        FROM apex_application_temp_files
        ORDER BY created_on DESC
        FETCH FIRST 1 ROW ONLY
    )
    SELECT line_number, 
        col001 AS deptno, 
        col002 AS dname,
        col003 AS loc,
        col004,
        col005,
        col006,
        row_info
    FROM files f
    CROSS JOIN TABLE(apex_data_parser.parse(
        p_content => f.blob_content,
        p_file_name => f.filename
    )) excel
    WHERE line_number > 1;
BEGIN
    FOR rec IN c_files LOOP
        INSERT INTO dept(
            deptno, 
            dname,
            loc
        ) VALUES (
            rec.deptno,
            rec.dname,
            rec.loc
        );
    END LOOP;
END;