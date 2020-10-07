'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinonChai = require('sinon-chai');

describe(
    'src',
    function () {
        describe(
            'index',
            function () {
                let index;
                let expect;
                let appStub;

                before(function () {
                    expect = chai.expect;
                    chai.use(sinonChai);
                });

                beforeEach(function () {
                    appStub = sinon.stub()
                        .returns('appStub');

                    index = proxyquire(
                        '../../../src/index.js',
                        {
                            './app': appStub
                        }
                    );
                });

                afterEach(function () {
                    sinon.reset();
                    sinon.restore();
                });

                it(
                    'should export 1 file',
                    function () {
                        const EXPORTED_FILES_COUNT = 1;

                        expect(Object.keys(index).length)
                            .to
                            .be
                            .equal(EXPORTED_FILES_COUNT);
                    }
                );

                it(
                    'should export correct file(s)',
                    function () {
                        expect(index.app())
                            .to
                            .be
                            .equal('appStub');
                    }
                );
            }
        );
    }
);
