package com.codechen.library.generator.mapper;

import com.codechen.library.generator.entity.FieldInfo;
import com.codechen.library.generator.entity.TableInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author：Java陈序员
 * @date：2024-11-6 11:04
 * @description：数据源 Mapper
 */
@Mapper
public interface DataSourceMapper {

    List<TableInfo> queryTableList();

    TableInfo queryTableInfo(@Param("tableName") String tableName);

    List<FieldInfo> queryFieldList(@Param("tableName") String tableName);
}
