package com.codechen.library.api.domain.entity;

import com.codechen.library.framework.domain.AbstractEntity;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author：Java陈序员
 * @date：2024-10-22 15:01
 * @description：文档
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Document extends AbstractEntity {

    /** 文档标题 */
    @ApiModelProperty(value = "文档标题")
    private String documentTitle;

    /** 文档作者 */
    private String documentAuthor;

    /** 创建时间 */
    @ApiModelProperty(value = "创建时间")
    private Date createdAt;

    /** 更新时间 */
    @ApiModelProperty(value = "更新时间")
    private Date updatedAt;

    /** 阅读 */
    @ApiModelProperty(value = "阅读")
    private Integer viewCount;

    private BigDecimal bigDecimal;
}
