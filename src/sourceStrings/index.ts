import {
    BooleanInt,
    CrowdinApi,
    isOptionalNumber,
    PaginationOptions,
    PatchRequest,
    ResponseList,
    ResponseObject,
    Status,
} from '../core';
import { SourceFilesModel } from '../sourceFiles';

/**
 * Source strings are the text units for translation. Instead of modifying source files, you can manage source strings one by one.
 *
 * Use API to add, edit, or delete some specific strings in the source-based and files-based projects.
 */
export class SourceStrings extends CrowdinApi {
    /**
     * @param projectId project identifier
     * @param uploadId export identifier
     */
    uploadStringsStatus(
        projectId: number,
        uploadId: string,
    ): Promise<ResponseObject<Status<SourceStringsModel.UploadStringsStatus>>> {
        const url = `${this.url}/projects/${projectId}/strings/uploads/${uploadId}`;
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request payload
     */
    uploadStrings(
        projectId: number,
        request: SourceStringsModel.UploadStringsRequest,
    ): Promise<ResponseObject<Status<SourceStringsModel.UploadStringsStatus>>> {
        const url = `${this.url}/projects/${projectId}/strings/uploads`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param options optional parameters for the request
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings.getMany
     */
    listProjectStrings(
        projectId: number,
        options?: SourceStringsModel.ListProjectStringsOptions,
    ): Promise<ResponseList<SourceStringsModel.String>>;
    /**
     * @param projectId project identifier
     * @param fileId file identifier
     * @param limit maximum number of items to retrieve (default 25)
     * @param offset starting offset in the collection (default 0)
     * @param filter filter strings by text and context
     * @param denormalizePlaceholders enable denormalize placeholders
     * @param labelIds filter strings by labelIds
     * @param scope specify field to be the target of filtering
     * @param croql filter strings by CroQL (Can't be used with `labelIds`, `filter` or `scope` in same request)
     * @param branchId filter by branch identifier
     * @param directoryId filter by directory identifier
     * @deprecated optional parameters should be passed through an object
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings.getMany
     */
    listProjectStrings(
        projectId: number,
        fileId?: number,
        limit?: number,
        offset?: number,
        filter?: string,
        denormalizePlaceholders?: BooleanInt,
        labelIds?: string,
        scope?: SourceStringsModel.Scope,
        croql?: string,
        branchId?: number,
        directoryId?: number,
    ): Promise<ResponseList<SourceStringsModel.String>>;
    listProjectStrings(
        projectId: number,
        options?: number | SourceStringsModel.ListProjectStringsOptions,
        deprecatedLimit?: number,
        deprecatedOffset?: number,
        deprecatedFilter?: string,
        deprecatedDenormalizePlaceholders?: BooleanInt,
        deprecatedLabelIds?: string,
        deprecatedScope?: SourceStringsModel.Scope,
        deprecatedCroql?: string,
        deprecatedBranchId?: number,
        deprecatedDirectoryId?: number,
    ): Promise<ResponseList<SourceStringsModel.String>> {
        let url = `${this.url}/projects/${projectId}/strings`;
        if (isOptionalNumber(options, '1' in arguments)) {
            options = {
                fileId: options,
                limit: deprecatedLimit,
                offset: deprecatedOffset,
                filter: deprecatedFilter,
                denormalizePlaceholders: deprecatedDenormalizePlaceholders,
                labelIds: deprecatedLabelIds,
                scope: deprecatedScope,
                croql: deprecatedCroql,
                branchId: deprecatedBranchId,
                directoryId: deprecatedDirectoryId,
            };
        }
        url = this.addQueryParam(url, 'fileId', options.fileId);
        url = this.addQueryParam(url, 'filter', options.filter);
        url = this.addQueryParam(url, 'denormalizePlaceholders', options.denormalizePlaceholders);
        url = this.addQueryParam(url, 'labelIds', options.labelIds);
        url = this.addQueryParam(url, 'scope', options.scope);
        url = this.addQueryParam(url, 'croql', options.croql);
        url = this.addQueryParam(url, 'branchId', options.branchId);
        url = this.addQueryParam(url, 'directoryId', options.directoryId);
        url = this.addQueryParam(url, 'orderBy', options.orderBy);
        url = this.addQueryParam(url, 'taskId', options.taskId);
        return this.getList(url, options.limit, options.offset);
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings.post
     */
    addString(
        projectId: number,
        request: SourceStringsModel.CreateStringRequest | SourceStringsModel.CreateStringStringsBasedRequest,
    ): Promise<ResponseObject<SourceStringsModel.String>> {
        const url = `${this.url}/projects/${projectId}/strings`;
        return this.post(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings.batchPatch
     */
    stringBatchOperations(
        projectId: number,
        request: PatchRequest[],
    ): Promise<ResponseList<SourceStringsModel.String>> {
        const url = `${this.url}/projects/${projectId}/strings`;
        return this.patch(url, request, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param query query params
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings.get
     */
    getString(
        projectId: number,
        stringId: number,
        query?: { denormalizePlaceholders: BooleanInt },
    ): Promise<ResponseObject<SourceStringsModel.String>> {
        let url = `${this.url}/projects/${projectId}/strings/${stringId}`;
        url = this.addQueryParam(url, 'denormalizePlaceholders', query?.denormalizePlaceholders);
        return this.get(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings.delete
     */
    deleteString(projectId: number, stringId: number): Promise<void> {
        const url = `${this.url}/projects/${projectId}/strings/${stringId}`;
        return this.delete(url, this.defaultConfig());
    }

    /**
     * @param projectId project identifier
     * @param stringId string identifier
     * @param request request body
     * @see https://developer.crowdin.com/api/v2/#operation/api.projects.strings.patch
     */
    editString(
        projectId: number,
        stringId: number,
        request: PatchRequest[],
    ): Promise<ResponseObject<SourceStringsModel.String>> {
        const url = `${this.url}/projects/${projectId}/strings/${stringId}`;
        return this.patch(url, request, this.defaultConfig());
    }
}

export namespace SourceStringsModel {
    export type UploadStringsType =
        | 'auto'
        | 'android'
        | 'macosx'
        | 'arb'
        | 'csv'
        | 'json'
        | 'xliff'
        | 'xliff_two'
        | 'xlsx';

    export interface UploadStringsStatus {
        branchId: number;
        storageId: number;
        fileType: UploadStringsType;
        parserVersion: number;
        labelIds: number[];
        importOptions: {
            firstLineContainsHeader: boolean;
            importTranslations: boolean;
            scheme: SourceFilesModel.Scheme;
        };
        updateStrings: boolean;
        cleanupMode: boolean;
        updateOption: UpdateOption;
    }

    export interface UploadStringsRequest {
        branchId: number;
        storageId: number;
        type?: UploadStringsType;
        parserVersion?: number;
        labelIds?: number[];
        updateStrings?: boolean;
        cleanupMode?: boolean;
        importOptions?: {
            firstLineContainsHeader: boolean;
            importTranslations: boolean;
            scheme: SourceFilesModel.Scheme;
        };
        updateOption?: UpdateOption;
    }

    export interface ListProjectStringsOptions extends PaginationOptions {
        orderBy?: string;
        denormalizePlaceholders?: BooleanInt;
        labelIds?: string;
        fileId?: number;
        branchId?: number;
        directoryId?: number;
        taskId?: number;
        croql?: string;
        filter?: string;
        scope?: SourceStringsModel.Scope;
    }

    export interface String {
        id: number;
        projectId: number;
        branchId: number;
        identifier: string;
        text: string | PluralText;
        type: Type;
        context: string;
        maxLength: number;
        isHidden: boolean;
        isDuplicate: boolean;
        masterStringId: boolean;
        hasPlurals: boolean;
        isIcu: boolean;
        labelIds: number[];
        webUrl: string;
        createdAt: string;
        updatedAt: string;
        fileId: number;
        directoryId: number;
        revision: number;
    }

    export interface CreateStringRequest {
        text: string | PluralText;
        identifier?: string;
        fileId: number;
        context?: string;
        isHidden?: boolean;
        maxLength?: number;
        labelIds?: number[];
    }

    export interface CreateStringStringsBasedRequest {
        text: string | PluralText;
        identifier: string;
        branchId: number;
        context?: string;
        isHidden?: boolean;
        maxLength?: number;
        labelIds?: number[];
    }

    export interface PluralText {
        zero?: string;
        one?: string;
        two?: string;
        few?: string;
        many?: string;
        other?: string;
    }

    export enum Type {
        TEXT = 0,
        ASSET = 1,
        ICU = 2,
    }

    export type Scope = 'identifier' | 'text' | 'context';
    export type UpdateOption =
        | 'clear_translations_and_approvals'
        | 'keep_translations'
        | 'keep_translations_and_approvals';
}
