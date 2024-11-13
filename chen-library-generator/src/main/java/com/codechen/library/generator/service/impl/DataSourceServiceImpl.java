package com.codechen.library.generator.service.impl;

import com.codechen.library.generator.config.GeneratorConfig;
import com.codechen.library.generator.constant.GeneratorConstants;
import com.codechen.library.generator.entity.FieldInfo;
import com.codechen.library.generator.entity.TableInfo;
import com.codechen.library.generator.mapper.DataSourceMapper;
import com.codechen.library.generator.service.IDataSourceService;
import com.codechen.library.generator.util.GeneratorUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author：Java陈序员
 * @date：2024-11-6 10:16
 * @description：数据源 ServiceImpl
 */
@Service
public class DataSourceServiceImpl implements IDataSourceService {

    @Autowired
    private DataSourceMapper dataSourceMapper;

    @Autowired
    private GeneratorConfig generatorConfig;

    @Override
    public List<TableInfo> tableList() {
        List<TableInfo> list = dataSourceMapper.queryTableList();

        list.forEach(item -> item.setClassName(GeneratorUtil.convertClassName(item.getTableName(),
                generatorConfig.getIgnoreTablePrefix(),
                generatorConfig.getTablePrefix())));
        return list;
    }

    @Override
    public TableInfo tableInfo(String tableName) {
        TableInfo tableInfo = dataSourceMapper.queryTableInfo(tableName);
        tableInfo.setClassName(GeneratorUtil.convertClassName(tableInfo.getTableName(),
                generatorConfig.getIgnoreTablePrefix(),
                generatorConfig.getTablePrefix()));
        return tableInfo;
    }

    @Override
    public List<FieldInfo> fieldList(String tableName) {
        List<FieldInfo> list = dataSourceMapper.queryFieldList(tableName);

        if (StringUtils.isNotBlank(generatorConfig.getIgnoreColumn())) {
            List<String> strings = Arrays.asList(generatorConfig.getIgnoreColumn().split(","));
            list = list.stream()
                    .filter(item -> {
                        return !strings.contains(item.getColumnName().toLowerCase());
                    })
                    .collect(Collectors.toList());
        }

        list.forEach(item -> {
                    item.setFileName(GeneratorUtil.convertFieldName(item.getColumnName()));
                    item.setFieldType(GeneratorUtil.convertFieldType(item.getDataType(), item.getColumnType()));
                }
        );

        return list;
    }
}
