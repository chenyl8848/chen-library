package com.codechen.library.generator.service;

import com.codechen.library.generator.entity.FieldInfo;
import com.codechen.library.generator.entity.TableInfo;

import java.util.List;

/**
 * @author：Java陈序员
 * @date：2024-11-6 10:15
 * @description：数据源 service
 */
public interface IDataSourceService {

    public List<TableInfo> tableList();

    public TableInfo tableInfo(String tableName);

    public List<FieldInfo> fieldList(String tableName);
}
